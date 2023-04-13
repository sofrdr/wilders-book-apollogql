import ISkill from "./ISkill";

export default interface Iwilder {
  id: number;
  name: string;
  email: string;
  city?: string;
  skills?: ISkill[];
  image: string;
}
