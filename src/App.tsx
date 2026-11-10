import { useState } from "react";
import "./App.css";
import type { TypeDominoDefault } from "./types/dominos";

function App() {
  const defSet: TypeDominoDefault = [
    [1, 1],
    [3, 3],
    [1, 1],
    [4, 4],
    [1, 1],
    [4, 4],
    [2, 2],
  ];

  const [domino, setDomino] = useState<TypeDominoDefault>(defSet);
  const [removeInput, setRemoveInput] = useState(false);
  const [removeNumber, setRemoveNumber] = useState(0);

  const findDouble = () => {
    let i = 0;
    for (let ii = 0; ii <= domino.length - 1; ii++) {
      const el = domino[ii];
      const el1 = el[0];
      const el2 = el[1];

      if (el1 === el2) i = i + 1;
    }
    return i;
  };

  const sort = (d: "asc" | "desc") => {
    let res: TypeDominoDefault = [];
    if (d == "asc") {
      res = domino
        .sort((a, b) => a[0] - b[0])
        .sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
    } else {
      res = domino
        .sort((a, b) => b[0] - a[0])
        .sort((a, b) => b[0] + b[1] - (a[0] + a[1]));
    }

    setDomino(() => [...res]);
  };

  const flip = () => {
    const res: TypeDominoDefault = [];
    for (let index = 0; index <= domino.length - 1; index++) {
      const el = domino[index];
      const newEl = [el[1], el[0]];
      res.push(newEl);
    }

    setDomino([...res]);
  };

  const removeDuplicate = () => {
    const res: TypeDominoDefault = [];
    for (let index = 0; index <= domino.length - 1; index++) {
      const el = domino[index];
      const total = el[0] + el[1];
      console.log(total, el, index);
      if (total != removeNumber) res.push(el);
    }
    console.log(res);
    setDomino(() => [...res]);
  };

  const reset = () => {
    let res: TypeDominoDefault = [];

    res = defSet;

    setDomino(() => [...res]);
  };

  return (
    <>
      <section id="center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            gap: "18px",
          }}
        >
          <div
            style={{
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              border: "1px white solid",
              backgroundColor: "slategray",
              color: "white",
              justifyContent: "center",
              alignItems: "start",
              borderWidth: 1,
              borderColor: "white",
              padding: "12px 12px",
            }}
          >
            <span style={{ color: "black", fontWeight: "500" }}>Source</span>
            <span>{`[${domino.map((e) => `[${e}]`)}]`}</span>
          </div>
          <div
            style={{
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              border: "1px white solid",
              backgroundColor: "slategray",
              color: "white",
              justifyContent: "center",
              alignItems: "start",
              borderWidth: 1,
              borderColor: "white",
              padding: "12px 12px",
            }}
          >
            <span style={{ color: "black", fontWeight: "500" }}>
              Double Numbers
            </span>
            <span>{findDouble()}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {domino.map((e) => (
              <div className="domino">
                {e
                  .join("-")
                  .split("")
                  .map((ee) => (
                    <div>{ee}</div>
                  ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="button"
              type="button"
              style={{}}
              onClick={() => sort("asc")}
            >
              {" "}
              Sort (ASC)
            </button>
            <button
              className="button"
              type="button"
              style={{}}
              onClick={() => sort("desc")}
            >
              {" "}
              Sort (DESC)
            </button>
            <button className="button" type="button" onClick={() => flip()}>
              {" "}
              Flip{" "}
            </button>
            <button
              className={removeInput ? "alt-button" : "def-button"}
              type="button"
              onClick={() => setRemoveInput(!removeInput)}
            >
              {" "}
              Remove Dup
            </button>
            <button className="button" type="button" onClick={() => reset()}>
              {" "}
              Reset
            </button>
          </div>

          {removeInput && (
            <>
              <input
                type="number"
                placeholder="input number total to remove"
                style={{ padding: "10px" }}
                onChange={(e) => setRemoveNumber(Number(e.target.value))}
              />
              <button
                type="button"
                className="button"
                onClick={() => removeDuplicate()}
              >
                Remove Duplicate
              </button>
            </>
          )}
        </div>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;
