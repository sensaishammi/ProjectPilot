import Clients from '../components/Clients';
import Projects from '../components/Projects';
import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';

export default function Home() {
  return (
    <div className="container">
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <div className="row">
        <div className="col-md-12 mb-4">
          <Projects />
        </div>
        <div className="col-md-12">
          <h3 className="mb-3">Clients</h3>
          <Clients />
        </div>
      </div>
    </div>
  );
}
