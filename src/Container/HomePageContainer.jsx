import HomePageComponent from "../Components/HomePageComponent";
import {useEffect, useState} from "react";

const HomePageContainer = () => {
    const [subject, setSubject] = useState("");
    const [listObj, setListObj] = useState([{title:"",arr:[]}]);
    const [result, setResult] = useState(null);
    const handleSubject = (value) => {
        setSubject(() => value);
    }
    useEffect( () => {
        if (result !== null) {
            console.log("running")
            console.log(result)
             setListObj(() => result.listObj);
        }
    }, [result])
    // save and download handling
    const handleSaveToPC = () => {
        const fileData = JSON.stringify({subject: subject, listObj: listObj});
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `savedFile.json`;
        link.href = url;
        link.click();
    }

    const handleListLoad = (e) => {
        // upload and render handling
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            setResult(() => JSON.parse(e.target.result));
        };
    }
    return (
        <HomePageComponent onSubjectChange={handleSubject}
                           onListSave={handleSaveToPC}
                           getList={setListObj}
                           onLoadSave={handleListLoad}
                           listObj={listObj}
                           setListObj={setListObj}
        />
    );
}
export default HomePageContainer;