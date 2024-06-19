import { UserDTO } from "./UserDTO";

export interface EventDTO {
    id: number;
    name: String;
    description: String;
    position?: String;
    active?: Boolean;
    createdBy?: UserDTO;
    created?: string;
    updated?: string;
    last_change?: UserDTO;
}
