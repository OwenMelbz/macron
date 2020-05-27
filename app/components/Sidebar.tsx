import { Button, Menu } from 'antd';
import React from 'react';

function Sidebar({ jobs, onSelect, onCreate }: SidebarProps) {
  const select = ({ key }) => {
    const job = jobs.find(j => j.key === key);
    onSelect(job);
  };

  return (
    <Menu
      onClick={select}
      mode="inline"
      className="h-screen overflow-x-hidden overflow-y-auto"
    >
      <li
        className="ant-menu-item ant-menu-item-only-child"
        role="menuitem"
        style={{ paddingLeft: 24, height: 60 }}
      >
        <div className="mt-4">
          <Button onClick={onCreate} type="primary" className="w-full">
            Create Job
          </Button>
        </div>
      </li>
      {jobs.map(job => (
        <Menu.Item key={job.key}>{job.name}</Menu.Item>
      ))}
    </Menu>
  );
}

export default Sidebar;
