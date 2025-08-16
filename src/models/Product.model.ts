import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  // 'declare' le dice a TypeScript: “este campo existe, pero no voy a inicializarlo aquí”.
  declare name: string;

  @Column({
    type: DataType.FLOAT(6, 2),
  })
  declare price: number;

  // Valor por defecto de esta columna, sera true
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare availability: boolean;
}

export default Product;
