import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Person.scss';

function Person({
  person,
  spouse,
  parent1,
  parent2,
  hideDetail,
}) {
  return (
    <div className="Person">
      <div
        className="Detail-Hide-Button"
        onClick={() => hideDetail(person)}
      >
        <FontAwesomeIcon icon={faTimes} title="Detail-Hide-Button" />
      </div>
      <div className="Person-Parents">
        {parent1 && (
          <div className="Person-Parent1">
            <p>Parent {parent1.name}</p>
            <p>Born {parent1.born}</p>
            <p>Hometown {parent1.hometown}</p>
          </div>
        )}
        {parent2 && (
          <div className="Person-Parent2">
            <p>Parent {parent2.name}</p>
            <p>Born {parent2.born}</p>
            <p>Hometown {parent2.hometown}</p>
          </div>
        )}
      </div>
      <div className="Person-Spouse-Row">
        <div className="Person-Person">
          <p>{person.name}</p>
          <p>Born {person.born}</p>
          <p>Hometown {person.hometown}</p>
        </div>
        {spouse && (
          <div className="Person-Spouse">
            <p>Spouse {spouse.name}</p>
            <p>Born {spouse.born}</p>
            <p>Hometown {spouse.hometown}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Person;
