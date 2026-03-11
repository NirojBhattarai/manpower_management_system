import viewIcon from '../../assets/icons/view_table.svg';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';

interface IProps {
  id: string;
  setactiveId?: React.Dispatch<React.SetStateAction<string>>;
}

interface IEditIconProps {
  updateRoutePath: string;
}

export const ViewIcon = ({ id }: IProps) => {
  const navigate = useNavigate();

  const handleViewClick = (id: string) => {
    navigate(`details/${id}`);
  };

  return (
    <img
      onClick={() => handleViewClick(id)}
      src={viewIcon}
      className="w-8 h-8 cursor-pointer"
      alt=""
    />
  );
};

export const EditIcon = ({ updateRoutePath }: IEditIconProps) => {
  return (
    <Link to={updateRoutePath}>
      <div className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors duration-300 hover:cursor-pointer">
        <MdOutlineEdit
          size={18}
          className="text-primary-400 hover:text-primary-600"
        />
      </div>
    </Link>
  );
};

export const DeleteIcon = () => {
  return (
    <div className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors duration-300 hover:cursor-pointer">
      <MdDelete size={18} className="text-primary-400 hover:text-primary-600" />
    </div>
  );
};
