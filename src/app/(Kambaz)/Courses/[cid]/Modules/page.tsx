/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  editModule,
  updateModule as updateModuleAction,
  deleteModule,
} from "./reducer";
import { RootState } from "../../../store";
import * as client from "../../client";

type Lesson = { id: string; name: string };
type Module = {
  _id: string;
  course: string;
  name: string;
  lessons?: Lesson[];
  editing?: boolean;
};

export default function Modules() {
  const { cid } = useParams();
  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  );
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (cid) {
      fetchModules();
    }
  }, [cid]);

  const fetchModules = async () => {
    try {
      const modulesFromServer = await client.findModulesForCourse(
        cid as string
      );
      dispatch(setModules(modulesFromServer || []));
    } catch (err) {
      console.error(err);
    }
  };

  // new handler: create module on server then update redux state
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    if (!moduleName.trim()) return;
    try {
      const newModule = { name: moduleName.trim(), course: cid };
      const created = await client.createModuleForCourse(
        cid as string,
        newModule
      );
      dispatch(setModules([...modules, created]));
      setModuleName("");
    } catch (err) {
      console.error(err);
    }
  };

  // handler to remove module from server then update redux state
  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdateModule = async (module: any) => {
    try {
      const updated = await client.updateModule(module);
      if (updated) {
        const newModules = modules.map((m: any) =>
          m._id === updated._id ? updated : m
        );
        dispatch(setModules(newModules));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: Module) => (
          <ListGroupItem
            className="wd-module p-0 mb-5 fs-5 border-gray"
            key={module._id}
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(
                      updateModuleAction({ ...module, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <ListGroupItem className="wd-lesson p-3 ps-1" key={lesson.id}>
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
