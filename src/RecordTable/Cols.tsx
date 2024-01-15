import { RecordTableColumn } from '.';

export default ({
    columns
}: {
    columns: RecordTableColumn<any>[]
}) => {
    return (
        <colgroup>
            {columns.map(item => (
                <col width={item.width}
                    style={{ width: `${item.width}px` }}
                ></col>
            ))}
        </colgroup>
    )
}