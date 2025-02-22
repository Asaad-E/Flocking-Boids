class SpatialHash {
  constructor() {
    this.reset();
  }

  reset() {
    this.cells = [];

    for (let row = 0; row < params.horizontalDivisions; row++) {
      this.cells.push([]);
      for (let column = 0; column <= params.verticalDivisions; column++) {
        this.cells[row].push([]);
      }
    }
  }

  getCell(pos) {
    let row = Math.floor(
      pos.x / (params.canvasWidth / params.horizontalDivisions)
    );
    let column = Math.floor(
      pos.y / (params.canvasHeight / params.verticalDivisions)
    );

    row =
      row === params.horizontalDivisions ? params.horizontalDivisions - 1 : row;

    column =
      column == params.verticalDivisions
        ? params.verticalDivisions - 1
        : column;

    return [row, column];
  }

  getNeighbors(pos, spatialHashWidth = 1, spatialHashHeight = 1) {
    let [row, column] = this.getCell(pos);

    let neighbors = [];

    for (let i = -spatialHashWidth; i <= spatialHashWidth; i++) {
      for (let j = -spatialHashHeight; j <= spatialHashHeight; j++) {
        let newRow = row + i;
        let newColumn = column + j;

        if (this.cells[newRow] && this.cells[newRow][newColumn]) {
          neighbors.push(this.cells[newRow][newColumn]);
        }
      }
    }

    return neighbors.flat();
  }
}
