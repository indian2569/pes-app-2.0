export enum ContractEnum {
  PERSONAL = <any>'PERSONAL',
  TELEPHONE = <any>'TELEPHONE',
  EMAIL = <any>'EMAIL',
  SOCIAL_NETWORK = <any>'SOCIAL_NETWORK'
}
// optional: Record type annotation guaranties that
// all the values from the enum are presented in the mapping
export const ContractEnum2LabelMapping: Record<ContractEnum, string> = {
    [ContractEnum.PERSONAL]: 'osobný',
    [ContractEnum.TELEPHONE]: 'telefonický',
    [ContractEnum.EMAIL]: 'emailovy',
    [ContractEnum.SOCIAL_NETWORK]: 'zo socialnej siete',
};
