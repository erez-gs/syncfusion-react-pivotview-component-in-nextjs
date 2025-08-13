"use client";
import {
  CalculatedField,
  FieldList,
  IDataOptions,
  IDataSet,
  Inject,
  PivotViewComponent,
} from "@syncfusion/ej2-react-pivotview";
import { pivotData } from "./datasource";

export default function Home() {
  const dataSourceSettings: IDataOptions = {
    columns: [
      { name: "Year", caption: "Production Year" },
      { name: "Quarter" },
    ],
    dataSource: pivotData as IDataSet[],
    expandAll: false,
    filters: [],
    drilledMembers: [{ name: "Country", items: ["France"] }],
    formatSettings: [{ name: "Amount", format: "C0" }],
    rows: [{ name: "Country" }, { name: "Products" }],
    values: [
      { name: "Sold", caption: "Units Sold" },
      { name: "Amount", caption: "Sold Amount" },
    ],
  };

  return (
    <>
      <PivotViewComponent
        id="PivotView"
        height={350}
        dataSourceSettings={dataSourceSettings}
        allowCalculatedField={true}
        showFieldList={true}
      >
        <Inject services={[CalculatedField, FieldList]} />
      </PivotViewComponent>
    </>
  );
}
