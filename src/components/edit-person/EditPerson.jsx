import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './EditPerson.scss';

function EditPerson({
  person,
  spouse,
  parent1,
  parent2,
  hideEdit,
  onSubmit,
  data,
}) {
  const [personEditData, setPersonEditData] = useState({
    person,
    spouse,
    parent1,
    parent2,
  });

  const update = (person, type, event) => {
    if(type === 'id') {
      let idType = 'spouseId';
      if(person === 'parent1') idType = 'parentId1';
      if(person === 'parent2') idType = 'parentId2';
      setPersonEditData({
        ...personEditData,
        person: {
          ...personEditData.person,
          [idType]: parseInt(event.target.value),
        },
        [person]: data.find(person2 => person2.id === parseInt(event.target.value)),
      });
      return;
    }

    setPersonEditData({
      ...personEditData,
      [person]: {
        ...personEditData[person],
        [type]: event.target.value || '',
      }
    });
  }

  const handleSubmit = (e) => {
    onSubmit(personEditData);
    hideEdit();
    e.preventDefault();
  };

  return (
    <div className="Edit-Person">
      <div
        className="Edit-Hide-Button"
        onClick={hideEdit}
      >
        <FontAwesomeIcon icon={faChevronUp} title="Edit-Hide-Button" />
      </div>
      <div className="Edit-Form">
        <form onSubmit={handleSubmit}>
          <label>
            <span className="Edit-Form-Label">Name:</span>
            <input
              type="text"
              value={personEditData.person.name}
              onChange={(e) => update("person", "name", e)}
              placeholder={person.name}
            />
          </label>
          <label>
            <span className="Edit-Form-Label">Born:</span>
            <input
              type="text"
              value={personEditData.person.born}
              onChange={(e) => update("person", "born", e)}
              placeholder={person.born}
            />
          </label>
          <label>
            <span className="Edit-Form-Label">Hometown:</span>
            <input
              type="text"
              value={personEditData.person.hometown}
              onChange={(e) => update("person", "hometown", e)}
              placeholder={person.hometown}
            />
          </label>
          <label>
            <span className="Edit-Form-Label">Spouse:</span>
            <select
              value={personEditData.spouse ? personEditData.spouse.id : ''}
              onChange={(e) => update("spouse", "id", e)}
              placeholder={person.spouse ? person.spouse.name : ''}
            >
              <option key='none' value=''>None</option>
              {data.filter(person => person.id !== personEditData.person.id).map((person) => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="Edit-Form-Label">Parent:</span>
            <select
              value={personEditData.parent1 ? personEditData.parent1.id : ''}
              onChange={(e) => update("parent1", "id", e)}
              placeholder={person.parent1 ? person.parent1.name : ''}
            >
              <option key='none' value=''>None</option>
              {data.filter(person => person.id !== personEditData.person.id && (!personEditData.parent2 || person.id !== personEditData.parent2.id)).map((person) => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="Edit-Form-Label">Parent:</span>
            <select
              value={personEditData.parent2 ? personEditData.parent2.id : ''}
              onChange={(e) => update("parent2", "id", e)}
              placeholder={person.parent2 ? person.parent2.name : ''}
            >
              <option key='none' value=''>None</option>
              {data.filter(person => person.id !== personEditData.person.id && (!personEditData.parent1 || person.id !== personEditData.parent1.id)).map((person) => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default EditPerson;
