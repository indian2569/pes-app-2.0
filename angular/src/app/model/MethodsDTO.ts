import { UserDTO } from "./UserDTO";

export interface MethodsDTO {
    id: number;
    name: String;
    description: String;
    active?: Boolean;
    createdBy?: UserDTO;
    created?: string;
    updated?: string;
    last_change?: UserDTO;
}
