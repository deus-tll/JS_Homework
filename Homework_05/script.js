(() => {
  let table = document.getElementById("pifagor-table");

  let headerRow = document.createElement("tr");

  for (let i = 0; i <= 10; i++) {
    let headerCell = document.createElement("th");

    if (i > 0) headerCell.textContent = i;

    headerCell.classList.add("thCells");
    headerRow.appendChild(headerCell);
  }

  table.appendChild(headerRow);

  for (let i = 1; i <= 10; i++) {
    let row = document.createElement("tr");

    let headerCell = document.createElement("th");
    headerCell.textContent = i;
    headerCell.classList.add("thCells");
    row.appendChild(headerCell);

    for (let j = 1; j <= 10; j++) {
      let cell = document.createElement("td");
      cell.textContent = i * j;
      cell.classList.add("tdCells");
      row.appendChild(cell);

      cell.addEventListener("mouseover", highlightCells);
      cell.addEventListener("mouseout", removeHighlightCells);
    }

    table.appendChild(row);
  }

  function highlightCells(event)
  {
    let currentCell = event.target;
    let rowIndex = currentCell.parentNode.rowIndex;
    let cellIndex = currentCell.cellIndex;

    currentCell.classList.add("highlight");

    let rows = table.rows;
    let cells = rows[rowIndex].cells;

    for (let i = 1; i < rowIndex; i++)
      rows[i].cells[cellIndex].classList.add("highlight-rows-cols");

    for (let i = 1; i < cellIndex; i++)
      cells[i].classList.add("highlight-rows-cols");
  }

  function removeHighlightCells(event)
  {
    let currentCell = event.target;
    let rowIndex = currentCell.parentNode.rowIndex;
    let cellIndex = currentCell.cellIndex;

    currentCell.classList.remove("highlight");

    let rows = table.rows;
    let cells = rows[rowIndex].cells;

    for (let i = 1; i < rowIndex; i++)
      rows[i].cells[cellIndex].classList.remove("highlight-rows-cols");

    for (let i = 1; i < cellIndex; i++)
      cells[i].classList.remove("highlight-rows-cols");
  }
})();
