import { useState, useEffect } from "react";
import { Folders } from "./Items";

interface SubSideBarProps {
  folderId: string;
  setShowSideBar: any;
  setRenderComponent: any;
  setSubFolderId: (folder: string) => void;
}

export default function SubSideBar({
  folderId,
  setShowSideBar,
  setRenderComponent,
  setSubFolderId
}: SubSideBarProps) {
  const [active, setActive] = useState('home');
  const [width, setWidth] = useState(window.innerWidth * 0.15);
  const [isResizing, setIsResizing] = useState(false);
  const minWidth = 100; 
  const maxWidth = 500;

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      if (e.clientX > minWidth && e.clientX < maxWidth) {
        setWidth(e.clientX);
      }
      
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="sidebar"
      style={{
        width: width,
        borderLeft: '1px solid #e0e0e0',
        overflow: 'hidden',
      }}>
      <nav className="nav-group" >
        <div className="flex flex-row justify-between">
          <h5 className="nav-group-title">{
            Folders.filter(folder => folder.id === folderId).map(folder => folder.title)}
          </h5>
          <span className="icon icon-left-open text-xl pt-1 pr-2"
            onClick={() => {
              setShowSideBar(false)
            }}></span>
        </div>
        {
          Folders.map(folder => (
            folder.id === folderId && folder.subfolders.map(subfolder => (
              <span key={subfolder.id} className={`nav-group-item ${active === subfolder.id ? 'active' : ''}`}
                onClick={() => {
                  setRenderComponent({
                    page: folderId + '_' + subfolder.id,
                    index: 0
                  })
                  setSubFolderId(subfolder.id)
                  setActive(subfolder.id)
                }}>
                <span className={`icon icon-${subfolder.icon}`}></span>
                {subfolder.title}
              </span>
            ))
          ))
        }
      </nav>
      <div
        className="resizer flex flex-col justify-center items-center"
        onMouseDown={() => setIsResizing(true)}
        style={{
          width: '50px',
          cursor: 'col-resize',
          height: '100%',
          position: 'relative',
          left: '97%',
          zIndex: 1,
        }
      }
      />
    </div>
  )
}
