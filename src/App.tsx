import React, { useState } from "react";
import Troop from "./components/Troop";
import { TroopModel } from "./model/TroopModel";
import getTroops from "./Troops";
import "./styles.css";

export default function App() {
  const [troopName, setTroopName] = useState<string>("");
  const [troopList, setTroopList] = useState<TroopModel[]>([]);
  const [armyCount, setArmyCount] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChangeTroopName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTroopName(event.target.value);
  };
  const onChangeArmy = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setArmyCount(parseInt(event.target.value, 10));
  };

  const addTroop = (): void => {
    let preDefined: boolean = false;
    const tName = troopName.trim();
    if (tName === "") {
      setErrorMsg("Please add troop name");
      return;
    }
    troopList.forEach((t: TroopModel, index: number) => {
      if (t.name === tName) {
        preDefined = true;
      }
    });

    if (!preDefined) {
      const newTroop: TroopModel = {
        name: tName,
        code: `C${troopList.length}`,
        count: 0
      };
      setTroopList([...troopList, newTroop]);
      setTroopName("");
      setErrorMsg("");
    } else {
      setErrorMsg("This troop was already added");
    }
  };

  const generateTroop = () => {
    if (troopList.length < 1) {
      setErrorMsg("Please add some Troops first");
      return;
    }
    if (armyCount < troopList.length) {
      setErrorMsg("Army count should be larger than count of Troop types");
      return;
    }
    const res: number[] = getTroops(troopList.length, armyCount);
    const arr: TroopModel[] = troopList.map((item, i) => {
      return { ...item, count: res[i] };
    });
    setTroopList(arr);
    setErrorMsg("");
  };

  return (
    <div className="App">
      <h1>Troop Generator</h1>
      <div>
        <h3>Please add troop types and total count of army</h3>
        <div className="textLeft">
          <span className="required">Troop Name: </span>
          <input
            className="mrs"
            onChange={onChangeTroopName}
            type="text"
            value={troopName}
          />
          <button onClick={addTroop}>Add</button>
        </div>
        <div className="textLeft mts">
          <span className="required">Army Count: </span>
          <input
            className="mrs"
            onChange={onChangeArmy}
            type="number"
            value={armyCount}
          />
          <button onClick={generateTroop}>Generate Troops</button>
        </div>
        {errorMsg !== "" && (
          <div className="mts">
            <span className="required">{errorMsg}</span>
          </div>
        )}
      </div>

      {troopList.length > 0 && (
        <table className="troopTable">
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Count</th>
          </tr>
          {troopList.map((troop) => (
            <Troop
              key={troop.code}
              name={troop.name}
              code={troop.code}
              count={troop.count}
            />
          ))}
        </table>
      )}
    </div>
  );
}
