import { message } from 'antd';
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default function handleExportExcel(title:any, list:any) {
    let worksheets : any = list?.map((i:any)=>generateWorkSheets(i?.title,i?.columns, i?.dataSource));
    worksheets = worksheets?.filter((i:any)=>i || i===0)
    if(worksheets?.length < 1) {
        message.info("暂无数据导出");
        return;
    }
    const workbook = XLSX.utils.book_new();
    worksheets.forEach(({worksheet, title}:any)=>{
        console.log(worksheet)
        XLSX.utils.book_append_sheet(workbook,worksheet, title)
    })
    const workbookOutput = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
    const filename = title;
    const file = new File([workbookOutput],filename,{type:'application/actet-stream'});
    FileSaver.saveAs(file);
}

const generateWorkSheets = (title:any, columns:any, dataSource:any)=>{
    const data = [columns?.map((col:any)=>col.title)];
    dataSource?.forEach((row:any)=>{
        const rowData = columns.map((col:any)=>{
            return row?.[col?.dataIndex];
        })
        data.push(rowData);
    })
    console.log(data)
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet["!cols"] = [];
    return {worksheet,title};
}