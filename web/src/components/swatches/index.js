import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import linkState from 'linkstate'
import style from './style';
import { Field, Choice, Button } from '../forms'
import { getURLForSVG, linearGradientRandom } from '../../api/swatches'

export default class Swatches extends Component {
	state = {
		width: 100,
		height: 100,
		shape: 'circle',
	}

	render({}, { width, height, shape }) {
		const svgURL = getURLForSVG(width, height, shape, linearGradientRandom)

		return (
			<section class={style.section}>
				<div>
					<img src={ svgURL } />
				</div>
				<div>
					{ svgURL }
				</div>
				<div>
					<Field label='Width' type='number' value={ width } onChange={ linkState(this, 'width') } />
					<Field label='Height' type='number' value={ height } onChange={ linkState(this, 'height') } />
					<Choice label='Shape' value={ shape } onChange={ linkState(this, 'shape') }>
						<option value='circle'>Circle</option>
						<option value='rect'>Rectangle</option>
					</Choice>
					<div>
						<Button>New</Button>
					</div>
				</div>
			</section>
		);
	}
}
