import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsAuthMiddleware } from 'websocket/middlewares/websocket-auth.middleware';

@WebSocketGateway({ cors: true, namespace: '/notifications' })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(NotificationGateway.name);
    private clients = new Map<string, Socket>();

    constructor(private readonly jwtService: JwtService) { }

    afterInit(server: Server) {
        this.logger.log('WebSocket Gateway inicializado');
        server.use((socket, next) => {
            const middleware = new WsAuthMiddleware(this.jwtService);
            middleware.use(socket, next);
        });
    }

    handleConnection(client: Socket) {
        this.logger.log(`Nueva conexión: ${client.id}`);
        const userId = client.data.userId;
        if (userId) {
            this.logger.log(`🔌 Usuario conectado: ${userId}`);
            this.clients.set(userId, client);
        } else {
            this.logger.warn('Conexión sin usuario válido');
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        const entry = [...this.clients.entries()].find(([, sock]) => sock.id === client.id);
        if (entry) {
            const [userId] = entry;
            this.clients.delete(userId);
            this.logger.log(`🔌 Usuario desconectado: ${userId}`);
        }
    }

    emitToUser(userId: string, event: string, payload: any) {
        const socket = this.clients.get(userId);
        if (socket) {
            socket.emit(event, payload);
        }
    }
}
