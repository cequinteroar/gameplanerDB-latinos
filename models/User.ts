import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Role {
  player: "player";
  trainer: "trainer";
  admin: "admin";
}

export interface Position {
  MO: "Medio Campo Ofensivo";
  LD: "Lateral Derecho";
  DFC: "Defensa Central";
  LI: "Lateral Izquierdo";
  LIB: "Libero";
  MC: "Medio Campo";
  MCD: "Medio Campo Defensivo";
  EXD: "Volante/Exterior derecho";
  EXI: "Volante/Exterior izquierdo";
  MD: "Medio Campo por derecha";
  MI: "Medio Campo por izquierda";
  DC: "Delantero Centro";
}

export interface Team {
  LA: "LAT-A";
  LB: "LAT-B";
}

export interface IUser extends Document {
  name: string;
  lastname: string;
  role: Role[];
  position: Position[];
  team: Team;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, required: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
  },
  {
    collection: "User",
  }
);

export default mongoose.model<IUser>("User", userSchema, "User");
