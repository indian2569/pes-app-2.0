import { EntryDTO } from "./EntryDTO";
import { PageDTO } from "./PageDTO";

export interface EntryPageDTO {
    results: EntryDTO[],
    paging: PageDTO
}
