import RenderList from "./ListItemRender";
import {generateId} from "../Container/ListHelperFunctions";
import "./ListComponent.css";

const ListComponent = (props) => {
    const listObj = props.listObj;
    let topLevel = [];
    for (let i = 0; i < listObj.length; i++) {
        let midLevel = [];
        if (listObj[i].arr) {
            for (let j = 0; j < listObj[i].arr.length; j++) {
                let lowerLevel = [];
                if (listObj[i].arr[j].arr) {
                    for (let k = 0; k < listObj[i].arr[j].arr.length || 0; k++) {
                        lowerLevel.push(<RenderList id={generateId([i, j, k])}
                                                    key={[i, j, k]}
                                                    title={listObj[i].arr[j].arr[k].title}
                                                    handleDnd={props.handleDnd}
                                                    handleButtonClick={props.handleButtonClick}
                                                    handleTitleChange={props.handleTitleChange}
                        />);
                    }
                }
                midLevel.push(
                    <RenderList id={generateId([i, j])}
                                key={[i, j]}
                                title={listObj[i].arr[j].title}
                                recurseList={lowerLevel}
                                handleDnd={props.handleDnd}
                                handleButtonClick={props.handleButtonClick}
                                handleTitleChange={props.handleTitleChange}
                    />)
            }
        }
        topLevel.push(
            <RenderList id={generateId([i])}
                        key={[i]}
                        title={listObj[i].title}
                        recurseList={midLevel}
                        handleDnd={props.handleDnd}
                        handleButtonClick={props.handleButtonClick}
                        handleTitleChange={props.handleTitleChange}
            />);
    }
    return (
        <div className={"list-container"}>
            <div style={{height:"100%"}}>{topLevel}</div>
            <div className={"add-button"} onClick={props.handleAdd}>Add</div>
        </div>);
}
export default ListComponent;

// const recurseFunc = (subArray, indexArr) => {
//     let recurseResult, result;
//     result = subArray.map((element, index) => {
//         if (element.arr) {
//             recurseResult = recurseFunc(element.arr, [...indexArr, index]);
//         }
//         console.log([...indexArr, index] + "----" + element.title);
//         return (
//             <RenderList id={generateId([...indexArr, index])}
//                         title={element.title}
//                         recurseList={recurseResult}
//             />);
//     });
//     return result;
// }