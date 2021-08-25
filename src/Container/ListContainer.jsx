import {useEffect, useState} from "react";
import ListComponent from "../Components/ListComponent";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {getArray} from "./ListHelperFunctions";


const ListContainer = (props) => {
    const [listObj, setListObj] = [props.listObj,props.setListObj];
    useEffect(()=>{
        props.getList(listObj)
    },[props,listObj]);

    // handle Indents
    const handleButtonClick = (e, shift) => {
        let indexArr = getArray(e.target.getAttribute("refid"));
        if (shift === "left") {
            if (indexArr.length === 1) {
                console.log("Already top level element");
            } else if (indexArr.length === 2) {
                let cutArr = listObj[indexArr[0]].arr.slice(indexArr[1]);
                let remainingArr = listObj[indexArr[0]].arr.slice(0, indexArr[1]);
                let addObj = {title: cutArr[0].title, arr: [...cutArr[0].arr, ...cutArr.slice(1)]};
                let remainingObj = {title: listObj[indexArr[0]].title, arr: remainingArr};
                let finalArr = [...listObj.slice(0, indexArr[0]), remainingObj, addObj, ...listObj.slice(indexArr[0] + 1)];
                console.log(finalArr)
                setListObj((prev) => finalArr);
            } else if (indexArr.length === 3) {
                let cutArr = listObj[indexArr[0]].arr[indexArr[1]].arr.slice(indexArr[2]);
                let remainingArr = listObj[indexArr[0]].arr[indexArr[1]].arr.slice(0, indexArr[2]);
                let addObj = {title: cutArr[0].title, arr: cutArr.slice(1)};
                let remainingObj = {title: listObj[indexArr[0]].arr[indexArr[1]].title, arr: remainingArr}
                let preFinalArr = [...listObj[indexArr[0]].arr.slice(0, indexArr[1]), remainingObj, addObj, ...listObj[indexArr[0]].arr.slice(indexArr[1] + 1)];
                let finalArr = [...listObj.slice(0, indexArr[0]), {
                    title: listObj[indexArr[0]].title,
                    arr: preFinalArr
                }, ...listObj.slice(indexArr[0] + 1)];
                console.log(finalArr);
                setListObj(() => finalArr);
            }
        } else if (shift === "right") {
            if (indexArr.length === 3) {
                console.log("Already bottom level element");
            }
            if (indexArr.length === 2) {
                if (indexArr[1] === 0) {
                    console.log("Illegal Move");
                    return
                } else {
                    let arrayToAppend = [{title: listObj[indexArr[0]].arr[indexArr[1]].title}, ...listObj[indexArr[0]].arr[indexArr[1]].arr];
                    let appendedChild = listObj[indexArr[0]].arr.map((item, index) => {
                        if (index === indexArr[1]) {
                            return
                        } else if (index === indexArr[1] - 1) {
                            return {title: item.title, arr: [...item.arr, ...arrayToAppend]}
                        }else{
                            return item
                        }
                    });
                    let filterChild = appendedChild.filter((item) => item !== undefined)

                    setListObj(() => {
                        return [...listObj.slice(0, indexArr[0]), {
                            title: listObj[indexArr[0]].title,
                            arr: filterChild
                        }, ...listObj.slice(indexArr[0] + 1)];
                    });
                }
            } else if (indexArr.length === 1) {
                if(indexArr[0] === 0 ){
                    console.log("Invalid Move");
                    return;
                }
                else{
                    let arrayToAppend = [{title:listObj[indexArr[0]].title,arr:[]},...listObj[indexArr[0]].arr];
                    let appendedArray = listObj.map((item,index)=>{
                        if (index === indexArr[0]) {
                            return
                        } else if (index === indexArr[0] - 1) {
                            return {title: item.title, arr: [...item.arr, ...arrayToAppend]}
                        }
                        else{
                            return item
                        }
                    });
                    let filterChild = appendedArray.filter((item) => item !== undefined)
                    setListObj(()=>filterChild)
                }
            }
        }
    }

    // Item Editing handling
    const handleTitleChange = (e) => {
        e.preventDefault();
        let indexArr = getArray(e.target.getAttribute("refid"));
        if (indexArr.length === 1) {
            setListObj((prev) => {
                return [...listObj.slice(0, indexArr[0]), {
                    title: e.target.value,
                    arr: listObj[indexArr[0]].arr
                }, ...listObj.slice(indexArr[0] + 1)];
            });
        } else if (indexArr.length === 2) {
            let child = listObj[indexArr[0]].arr;
            let newChild = [...child.slice(0, indexArr[1]), {
                title: e.target.value,
                arr: child[indexArr[1]].arr
            }, ...child.slice(indexArr[1] + 1)];
            setListObj(() => {
                return [...listObj.slice(0, indexArr[0]), {
                    title: listObj[indexArr[0]].title,
                    arr: newChild
                }, ...listObj.slice(indexArr[0] + 1)];
            });
        } else if (indexArr.length === 3) {
            let element = {title: e.target.value}
            let bottomArr = listObj[indexArr[0]].arr[indexArr[1]].arr.map((item, index) => {
                if (index === indexArr[2]) {
                    return {title: e.target.value}
                }
                return item;
            });
            let middleArr = listObj[indexArr[0]].arr.map((item, index) => {
                if (index === indexArr[1]) {
                    return {title: item.title, arr: bottomArr};
                }
                return item;
            })

            setListObj(() => {
                return [...listObj.slice(0, indexArr[0]), {
                    title: listObj[indexArr[0]].title,
                    arr: middleArr
                }, ...listObj.slice(indexArr[0] + 1)];
            });
        }
    }
    // Item Addition Handling
    const handleAdd = (e) => {
        e.preventDefault();
        let child1 = listObj[listObj.length - 1];
        let child2;
        if (child1.arr.length === 0) {
            setListObj((prev) => {
                let lastObj = {title: child1.title, arr: [{title: "", arr: []}]}
                return prev.map((item, index) => {
                    if (index === listObj.length - 1) {
                        return lastObj;
                    } else {
                        return item;
                    }
                });
            });
        } else if ( child1.arr[child1.arr.length - 1].arr.length === 0) {
            child2 = child1.arr[child1.arr.length - 1];

            setListObj((prev) => {
                let lastArr = child1.arr.map((item, index) => {
                    if (index === child1.arr.length - 1) {
                        return {title: child2.title, arr: [{title: ""}]};
                    } else {
                        return item;
                    }
                })
                return prev.map((item, index) => {
                    if (index === listObj.length - 1) {
                        return {title: item.title, arr: lastArr};
                    } else {
                        return item;
                    }
                });
            });
        } else if (child1.arr[child1.arr.length - 1].arr.length  !== 0) {
            child2 = child1.arr[child1.arr.length - 1];

            setListObj((prev) => {
                let lastArr = child1.arr.map((item, index) => {
                    if (index === child1.arr.length - 1) {
                        return {title: child2.title, arr: [...child2.arr, {title: ""}]};
                    } else {
                        return item;
                    }
                })
                return prev.map((item, index) => {
                    if (index === listObj.length - 1) {
                        return {title: item.title, arr: lastArr};
                    } else {
                        return item;
                    }
                });
            });
        }

    }

    // Drag N Drop handling Using IF Statement
    const [dndIndex, setDndIndex] = useState(null);
    const handleDnd = (value) => {
        setDndIndex(() => value);
    }
    if (dndIndex !== null) {
        let dragIndex = dndIndex[0];
        let dropIndex = dndIndex[1];
        let dragLength = dragIndex.length;
        let dropLength = dropIndex.length;
        if (dragLength === 3) {
            console.log(listObj[dragIndex[0]].arr[dragIndex[1]].arr)
            let sourceCopy = [...listObj[dragIndex[0]].arr[dragIndex[1]].arr];
            let tempElement = sourceCopy.slice(dragIndex[2], dragIndex[2] + 1)[0];
            let newSourceCopy = sourceCopy.filter((item) => item !== tempElement);

            let targetCopy = [...listObj[dropIndex[0]].arr[dropIndex[1]].arr];
            if (dropIndex[0] === dragIndex[0] && dropIndex[1] === dragIndex[1]) {
                targetCopy = [...newSourceCopy];
            }
            let newTargetCopy;
            if (dropLength === 3) {
                newTargetCopy = [...targetCopy.slice(0, dropIndex[2]), tempElement, ...targetCopy.slice(dropIndex[2])];
            } else if (dropLength === 2) {
                newTargetCopy = [...targetCopy, tempElement];
            }
            setListObj(() => {
                let listCopy = [...listObj];
                const newListObj = listCopy.map((item, index) => {
                    if (index === dragIndex[0] || index === dropIndex[0]) {
                        return {
                            title: item.title, arr: item.arr.map((subItem, subIndex) => {
                                if (index === dropIndex[0] && subIndex === dropIndex[1]) {
                                    return {title: subItem.title, arr: newTargetCopy}
                                } else if (index === dragIndex[0] && subIndex === dragIndex[1]) {
                                    return {title: subItem.title, arr: newSourceCopy}
                                } else {
                                    return subItem;
                                }
                            })
                        };
                    } else {
                        return item;
                    }
                });
                return newListObj;
            });

        } else if (dragLength === 2) {
            let sourceCopy = [...listObj[dragIndex[0]].arr];
            let tempElement = sourceCopy.slice(dragIndex[1], dragIndex[1] + 1)[0];
            let newSourceCopy = sourceCopy.filter((item) => item !== tempElement);

            let targetCopy = [...listObj[dropIndex[0]].arr];
            if (dropIndex[0] === dragIndex[0]) {
                targetCopy = [...newSourceCopy];
            }
            let newTargetCopy;
            if (dropLength === 2) {
                newTargetCopy = [...targetCopy.slice(0, dropIndex[1]), tempElement, ...targetCopy.slice(dropIndex[1])];
            } else if (dropLength === 1) {
                newTargetCopy = [...targetCopy, tempElement];
            }
            setListObj(() => {
                let listCopy = [...listObj];
                const newListObj = listCopy.map((item, index) => {
                    if (index === dropIndex[0]) {
                        return {title: item.title, arr: newTargetCopy}
                    } else if (index === dragIndex[0]) {
                        return {title: item.title, arr: newSourceCopy}
                    } else {
                        return item;
                    }
                });
                return newListObj;
            });
        } else if (dragLength === 1) {
            let sourceCopy = [...listObj];
            let tempElement = sourceCopy.splice(dragIndex[0], 1)[0];
            let targetCopy = sourceCopy;
            if (dropLength === 1) {
                targetCopy.splice(dropIndex[0], 0, tempElement);
            }
            setListObj(() => {
                let listCopy;
                listCopy = targetCopy;
                return listCopy;
            });
        }
        setDndIndex(() => null)
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <ListComponent listObj={listObj}
                           handleDnd={handleDnd}
                           handleAdd={handleAdd}
                           handleButtonClick={handleButtonClick}
                           handleTitleChange={handleTitleChange}
            />
        </DndProvider>);
}
export default ListContainer;