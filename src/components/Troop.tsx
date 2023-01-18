import { TroopModel } from "../model/TroopModel";

export default function Troop(props: TroopModel): JSX.Element {
  return (
    <tr className="troopRow">
      <td>{props.name}</td>
      <td>{props.code !== "" && props.code}</td>
      <td>{props.count > 0 && props.count}</td>
    </tr>
  );
}
