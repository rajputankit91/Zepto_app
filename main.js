import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { Model } from './src/model/model';
import { ContainerView } from './src/view/containerView';
import { HeaderView } from './src/view/headerView';
console.log(Model);

const container = new ContainerView(Model)
container.init();

const headerView = new HeaderView(Model);