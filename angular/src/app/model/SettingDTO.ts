import { UserDTO } from "./UserDTO";

/** Common shape of the setting lists (campaigns, coworkers, events, institutions, methods, programs). */
export interface SettingDTO {
    id?: string;
    name: string;
    description: string;
    active?: boolean;
    createdBy?: UserDTO;
    created?: string;
    updated?: string;
    last_change?: UserDTO;
}
