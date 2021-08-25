import {useDrag, useDrop} from "react-dnd";
import {canDrop,getArray} from "../Container/ListHelperFunctions";
import TextareaAutosize from 'react-textarea-autosize';
import "./ListItemRender.css";
const RenderListItem = (props) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "row",
        item: {dragId: props.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));
    const [, drop] = useDrop(() => ({
        accept: "row",
        options: {dropId: props.id},
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            const dropId = props.id;
            if (!didDrop) {
                let allowDrop = canDrop(item.dragId, dropId);
                if (allowDrop) {
                    props.handleDnd(allowDrop);
                } else {
                    console.log("Drop not allowed")
                }
            }
            return null;
        },
    }), [{dragId: props.id}]);

    function sharedRef(ev) {
        drag(ev);
        drop(ev);
    }

    return (
        <div id={props.id}
             ref={sharedRef}
             style={{"opacity": isDragging ? "50%" : null, "display": isDragging ? "none" : null}}
             className={"item-container"}
        >
            <i>Move</i>
            <span onDrag={(e)=>{e.stopPropagation();e.preventDefault()} }>
                <span>
                    <button refid={props.id} className={"button"}
                            onClick={(e) => props.handleButtonClick(e, "left")}>
                        Left
                    </button>
                    <button refid={props.id} className={"button"}
                            onClick={(e) => props.handleButtonClick(e, "right")}>
                        Right
                        </button>
                </span>
                <TextareaAutosize refid={props.id}
                                  value={props.title}
                                  onChange={(e) => props.handleTitleChange(e)}
                                  className={"indent"+getArray(props.id).length}
                                  cols={"50"}
                />
            </span>
            {props.recurseList === undefined || props.recurseList === [] ? null : props.recurseList}
        </div>);
}
export default RenderListItem;