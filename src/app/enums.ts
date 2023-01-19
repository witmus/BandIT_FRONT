export interface EnumValue{
    value: number;
    text: string;
}

abstract class BaseTypes{
  static get Types(): EnumValue[] {
    return [];
  }

  public static get(key: number) : string {
    return this.Types.find(t => t.value === key)?.text ?? '';
  }
}

export class ContactTypes extends BaseTypes{
  static override get Types(): EnumValue[] {
    return [
      {value: 0, text: "Kontakt"},
      {value: 1, text: "Menedżer"},
      {value: 2, text: "Muzyk"},
      {value: 3, text: "Promotor"},
      {value: 4, text: "Dziennikarz"},
      {value: 5, text: "Producent"},
      {value: 6, text: "Inżynier dźwięku"},
      {value: 7, text: "Prawnik"},
      {value: 8, text: "Właściciel lokalu"},
      {value: 9, text: "Właściciel studia"},
    ]
  }
}

export class GearTypes extends BaseTypes{
  static override get Types(): EnumValue[] {
    return [
      {value: 0, text: "Sprzęt"},
      {value: 1, text: "Instrument"},
      {value: 2, text: "Wzmacniacz"},
      {value: 3, text: "Głośnik"},
      {value: 4, text: "Mikrofon"},
      {value: 5, text: "Dekoracja"},
      {value: 6, text: "Oświetlenie"},
      {value: 7, text: "Elektronika"},
      {value: 8, text: "Akcesorium"},
    ]
  }
}

export class PositionTypes extends BaseTypes{
  static override get Types(): EnumValue[] {
    return [
      {value: 0, text: "Domyślna"},
      {value: 1, text: "Wypłata"},
      {value: 2, text: "Merch"},
      {value: 3, text: "Bilety"},
      {value: 4, text: "Streaming"},
      {value: 5, text: "Płyty"},
      {value: 6, text: "Transport"},
      {value: 7, text: "Nocleg"},
      {value: 8, text: "Usługa"},
      {value: 9, text: "Wypożyczenie"},
    ]
  }
}

export class UserRoles extends BaseTypes {
  static override get Types(): EnumValue[] {
    return [
      {value: 0, text: "Użytkownik"},
      {value: 1, text: "Pracownik"},
      {value: 2, text: "Członek zespołu"},
      {value: 3, text: "Menedżer"},
    ]
  }
}