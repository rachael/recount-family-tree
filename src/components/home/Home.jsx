import React, { useState } from 'react';
import classNames from 'classnames';
import { data } from '../../api';
import Person from '../person';
import './Home.scss';

function Home() {
  const findSpouse = (person) => {
    if(person.spouseId !== undefined) return data.find((person2) => person2.id === person.spouseId);
    return undefined;
  }

  const findParent1 = (person) => {
    if(person.parentId1 !== undefined) return data.find((person2) => person2.id === person.parentId1);
    return undefined;
  }

  const findParent2 = (person) => {
    if(person.parentId2 !== undefined) return data.find((person2) => person2.id === person.parentId2);
    return undefined;
  }

  const [openDetailViews, setOpenDetailViews] = useState({});
  const openDetailView = (person) => {
    setOpenDetailViews({
      ...openDetailViews,
      [person.id]: true,
    });
  }

  const closeDetailView = (person) => {
    setOpenDetailViews({
      ...openDetailViews,
      [person.id]: false,
    })
  }

  const [personData, setPersonData] = useState(data);
  const handleEdit = (personEditData) => {
    console.log('setting person data to', [
      ...personData.filter(person => person.id !== personEditData.person.id),
      {
        ...personData.find(person => person.id === personEditData.person.id),
        ...personEditData.person,
      }
    ])
    setPersonData([
      ...personData.filter(person => person.id !== personEditData.person.id),
      {
        ...personData.find(person => person.id === personEditData.person.id),
        ...personEditData.person,
      }
    ]);
  }

  return (
    <div className="Home">
      <header className="Home-Header"><h1>Family Tree</h1></header>
      <div className="Home-Persons">
        {personData.sort((a, b) => a.id - b.id).map(person => (
          <div
            key={person.id}
            className={classNames("Home-Person", { 'show-detail': openDetailViews[person.id] })}
          >
            <div className="Home-Person_default-view" onClick={() => openDetailView(person)}>
              <p>{person.name}</p>
              <p>Born {person.born}</p>
              <p>Hometown {person.hometown}</p>
              {person.spouseId !== undefined && <p>Spouse {findSpouse(person).name}</p>}
              {person.parentId1 !== undefined && <p>Parent {findParent1(person).name}</p>}
              {person.parentId2 !== undefined && <p>Parent {findParent2(person).name}</p>}
            </div>
            <div className="Home-Person_detail-view">
              <Person
                person={person}
                spouse={findSpouse(person)}
                parent1={findParent1(person)}
                parent2={findParent2(person)}
                hideDetail={closeDetailView}
                onEdit={handleEdit}
                data={personData}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
