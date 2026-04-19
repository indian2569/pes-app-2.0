import { CardBasicDTO } from "./CardBasicDTO";
import { PageDTO } from "./PageDTO";

export interface CardPageDTO {
    results: CardBasicDTO[],
    paging: PageDTO
}