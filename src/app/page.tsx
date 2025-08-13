"use client";
import {
  CalculatedField,
  FieldList,
  IDataOptions,
  IDataSet,
  Inject,
  PivotCellSelectedEventArgs,
  PivotViewComponent,
} from "@syncfusion/ej2-react-pivotview";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject as ChartInject,
  ColumnSeries,
  Legend,
  Tooltip,
  Category,
} from "@syncfusion/ej2-react-charts";
import React, { useState } from "react";
import { pivotData } from "./datasource";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1JEaF1cWWhAYVJ0WmFZfVtgfF9CZFZRRmYuP1ZhSXxWdk1iWn5edXFVRGBdUUx9XEI="
);

export default function Home() {
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  function onCellSelected(args: PivotCellSelectedEventArgs) {
    const selectedCells = args.selectedCellsInfo;
    if (!selectedCells) return;

    const chartData = selectedCells.map((cell) => {
      const x = Array.isArray(cell.columnHeaders)
        ? cell.columnHeaders.join(" - ")
        : String(cell.columnHeaders);
      const y = typeof cell.value === "number" ? cell.value : 0;
      return { x, y };
    });

    setChartData(chartData);
  }

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
        showTooltip={false}
        id="PivotView"
        height={350}
        dataSourceSettings={dataSourceSettings}
        allowCalculatedField={true}
        showFieldList={true}
        cellSelected={onCellSelected}
        gridSettings={{
          allowSelection: true,
          selectionSettings: {
            mode: "Cell",
            type: "Multiple",
            cellSelectionMode: "Box",
          },
        }}
      >
        <Inject services={[CalculatedField, FieldList]} />
      </PivotViewComponent>

      <ChartComponent
        id="charts"
        primaryXAxis={{ valueType: "Category" }}
        title="Selected Data Chart"
        dataSource={chartData}
        tooltip={{ enable: true }}
      >
        <ChartInject services={[ColumnSeries, Legend, Tooltip, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective type="Column" xName="x" yName="y" />
        </SeriesCollectionDirective>
      </ChartComponent>
    </>
  );
}
