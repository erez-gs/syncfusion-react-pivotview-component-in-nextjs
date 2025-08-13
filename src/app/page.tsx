"use client";
import {
  CalculatedField,
  FieldList,
  IDataSet,
  Inject,
  ExcelExport,
  PivotCellSelectedEventArgs,
  PivotViewComponent,
  Toolbar,
  ToolbarItems,
  VirtualScroll,
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
  Export,
} from "@syncfusion/ej2-react-charts";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import { DataSourceSettingsModel } from "@syncfusion/ej2-pivotview/src/model/datasourcesettings-model";
import { generateData } from "./datasource";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1JEaF1cWWhAYVJ0WmFZfVtgfF9CZFZRRmYuP1ZhSXxWdk1iWn5edXFVRGBdUUx9XEI="
);

export default function Home() {
  let chartInstance = useRef(null);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [chartType, setChartType] = useState<
    "Column" | "Line" | "Bar" | "Area"
  >("Column");

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

  function handleChartTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    setChartType(event.target.value as "Column" | "Line" | "Bar" | "Area");
  }

  const [pivotData, setPivotData] = useState<IDataSet[]>([]);

  useEffect(() => {
    const startTime = performance.now();
    const generatedData = generateData(100000);
    const endTime = performance.now();
    console.log(`generateData took ${(endTime - startTime).toFixed(3)} ms`);
    setPivotData(generatedData);
  }, []);

  const dataSourceSettings: DataSourceSettingsModel = {
    enableSorting: true,
    expandAll: true,
    formatSettings: [{ name: "Price", format: "C0" }],
    rows: [{ name: "ProductID" }],
    columns: [{ name: "Year" }],
    values: [
      { name: "Price", caption: "Unit Price" },
      { name: "Sold", caption: "Unit Sold" },
    ],
    dataSource: pivotData as IDataSet[],
  };

  let pivotObj: any;

  let toolbarOptions: ToolbarItems[] = ["Grid", "Export"];

  let report: any;

  function save() {
    report = pivotObj.getPersistData();
  }
  function load() {
    pivotObj.loadPersistData(report);
  }
  function exportChart() {
    console.dir(chartInstance.current.exportModule);

    if (chartInstance.current && chartInstance.current.exportModule) {
      chartInstance.current.exportModule.export("PNG", "SelectedDataChart");
    }
  }

  return (
    <>
      <PivotViewComponent
        enableVirtualization={true}
        virtualScrollSettings={{ allowSinglePage: true }}
        allowPdfExport={true}
        showToolbar={true}
        toolbar={toolbarOptions}
        ref={(d) => (pivotObj = d)}
        showTooltip={false}
        allowExcelExport={true}
        id="PivotView"
        height={350}
        dataSourceSettings={dataSourceSettings}
        allowCalculatedField={true}
        showFieldList={true}
        enableValueSorting={true}
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
        <Inject
          services={[
            CalculatedField,
            FieldList,
            ExcelExport,
            Toolbar,
            VirtualScroll,
          ]}
        />
      </PivotViewComponent>

      <div className="flex flex-row gap-4">
        <button onClick={exportChart}>export chart</button>
        <ChartComponent
          id="charts"
          ref={chartInstance}
          primaryXAxis={{ valueType: "Category" }}
          title="Selected Data Chart"
          dataSource={chartData}
          tooltip={{ enable: true }}
        >
          <ChartInject
            services={[ColumnSeries, Legend, Tooltip, Category, Export]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective type={chartType} xName="x" yName="y" />
          </SeriesCollectionDirective>
        </ChartComponent>

        <div className="flex flex-row gap-2">
          <button onClick={save}>Save</button>
          <button onClick={load}>Load</button>

          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="border p-2 rounded"
          >
            <option value="Column">Column</option>
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
            <option value="Area">Area</option>
          </select>
        </div>
      </div>
    </>
  );
}
