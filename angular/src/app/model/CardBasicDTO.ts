import { InstitutionDTO } from './InstitutionDTO';
import { UserDTO } from './UserDTO';

export interface CardBasicDTO {
id?: number;
client_nick?: string;
client_gender?: string;
client_anamnesis?: string;
client_dev_plan?: string;
clint_age?: number;
client_birth_year?: number;
client_name?: string;
client_surname?: string;
client_birth_date?: string;
client_family_status?: string;
client_citizenship?: string;
client_address?: string;
client_phone?: string;
client_email?: string;
client_socnet?: string;
client_health?: string;
client_income?: string;
client_belongings?: string;
client_other_institutes?: InstitutionDTO[];
createdBy?: UserDTO;
status?: string;
created?: string;
updated?: string;
last_change?: UserDTO;
}
