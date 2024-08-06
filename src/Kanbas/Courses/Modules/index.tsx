import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from 'react-icons/bs';
import { useParams } from "react-router";
import * as db from "../../Database";
import { useState, useEffect } from "react";
import * as client from "./client";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  // const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  };

  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };



  // const addModule = () => {
  //   setModules([...modules, {
  //     _id: new Date().getTime().toString(),
  //     name: moduleName, course: cid, lessons: []
  //   }]);
  //   setModuleName("");
  // };
  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };
  // const editModule = (moduleId: string) => {
  //   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);


  return (
    <div className="container" style={{ marginTop: '-260px' }}>
      <div className="row justify-content-end" style={{ marginTop: '-280px', marginLeft: '300px' }}>

        <div>

          <div className="wd-modules">
            <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
              addModule={() => {
                createModule({ name: moduleName, course: cid });
                setModuleName("");
              }} /><br /><br /><br /><br />

            <ul id="wd-modules" className="list-group rounded-0">
              {modules
                .filter((module: any) => module.course === cid)
                .map((module: any) => (
                  <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                      <BsGripVertical className="me-2 fs-3" />
                      {!module.editing && module.name}
                      {module.editing && (
                        <input className="form-control w-50 d-inline-block" value={module.name}
                        onChange={(e) => saveModule({ ...module, name: e.target.value }) }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveModule({ ...module, editing: false });
                          }
                        }} />
                      )}
                      <ModuleControlButtons
                        moduleId={module._id}
                        deleteModule={(moduleId) => { removeModule(moduleId); }}
                        editModule={(moduleId) => dispatch(editModule(moduleId))} />
                    </div>
                    {module.lessons && (
                      <ul className="wd-lessons list-group rounded-0">
                        {module.lessons.map((lesson: any) => (
                          <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />
                            {lesson.name}
                            <LessonControlButtons />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </div>


  );
}