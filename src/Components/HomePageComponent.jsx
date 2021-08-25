import ListContainer from "../Container/ListContainer";

const HomePageComponent = (props) => {
    const handleSubjectChange = (subject) => {
        props.onSubjectChange(subject);
    }
    const handleListSave = (list) => {
        props.onListSave(list);
    }
    return (<div className={"homepage"}>
        <input placeholder={"Subject"} style={{"fontSize":"18px"}}
            onChange={(e) => handleSubjectChange(e.target.value)}/>
        <div  style={{"paddingLeft":"10%"}}>
            <span style={{width:"50%",margin:"0",float:"left"}} >
                Action
                <p >Move,Indent,Outdent,Delete</p >
            </span>
            <span style={{width:"50%",margin:"0"}}>
                Standard
                <p>The Text of Standard</p>
            </span>
        </div>
        < ListContainer listSave={handleListSave}
                        getList={props.getList}
                        listObj={props.listObj}
                        setListObj={props.setListObj}
        />
        <div>
            <button onClick={props.onListSave}>Save</button>
        </div>
        <div>
            <input type="file" onChange={props.onLoadSave} />
        </div>
    </div>)
}
export default HomePageComponent;