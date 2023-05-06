export default class Room {

    get STATUS_WAITING_FOR_PLAYERS() {
        return 1;
    }

    get STATUS_IN_PROGRESS() {
        return 2;
    }

    get STATUS_FINISHED() {
        return 3;
    }

    get STATUS_LIST() {
        return {
            1: "Aguardando Jogadores",
            2: "Jogando",
            3: "Finalizada"
        };
    }

    name;
    password;
    status;
    max_players;
    active;
    board;
    owner;
    users;

    constructor() {

    }

}