import { data } from '../../api';
import './Home.scss';

function Home() {
  return (
    <div className="Home">
      <header className="Home-Header"><h1>Family Tree</h1></header>
      <div className="Home-Persons">
        {data.map(person => (
          <div className="Home-Person">
            <p>{person.name}</p>
            <p>Born {person.born}</p>
            <p>Hometown {person.hometown}</p>
            {person.spouseId !== undefined && <p>Spouse {data.find((person2) => person2.id === person.spouseId).name}</p>}
            {person.parentId1 !== undefined && <p>Parent {data.find((person2) => person2.id === person.parentId1).name}</p>}
            {person.parentId2 !== undefined && <p>Parent {data.find((person2) => person2.id === person.parentId2).name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
