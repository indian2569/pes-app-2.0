import { CardBasicDTO } from './CardBasicDTO';
import { MethodsDTO } from './MethodsDTO';
import { CoworkerDTO } from './CoworkerDTO';
import { ProgramDTO } from './ProgramDTO';
import { CampaignDTO } from './CampaignDTO';
import { EventDTO } from './EventDTO';

export interface EntryDTO {
id?: number;
client: CardBasicDTO[];
clients_on_site: CardBasicDTO[];
entry_date_from: string;
entry_date_to: string;
duration: string;

place: string;
contact_type: EventDTO; /**typ kontraktu*/
campaign: CampaignDTO; /**kampan*/
program_type: ProgramDTO; /**program*/
work_methods: MethodsDTO[]; /** metody prace*/
other_workers: CoworkerDTO[]; /** dalsi pracovnici*/
event_description: string; /** popis udalosti*/
fast_message: string;
createdBy?: CoworkerDTO;
}
