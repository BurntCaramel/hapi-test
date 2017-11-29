import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import linkState from 'linkstate'
import style from './style';
import { Field, Choice, Button, FormGroup } from '../forms'
import { randomRGB, getPathForFill, getURLForSVG } from '../../api/swatches'

export default class Swatches extends Component {
	state = {
		width: 100,
		height: 100,
		shape: 'circle',
		fill: {
			type: 'linear-gradient',
			args: ['#fff', '#000']
		}
	}

	randomizeColor0 = () => {
		const rgb = randomRGB()
		this.setState(({ fill }) => ({
			fill: {
				...fill,
				args: [rgb, fill.args[1]]
			}
		}))
	}

	randomizeColor1 = () => {
		const rgb = randomRGB()
		this.setState(({ fill }) => ({
			fill: {
				...fill,
				args: [fill.args[0], rgb]
			}
		}))
	}

	render({}, { width, height, shape, fill }) {
		const fillPath = getPathForFill(fill)
		const svgURL = getURLForSVG(width, height, shape, fillPath)

		return (
			<section class={style.section}>
				<div className='mb-3'>
					<img src={ svgURL } />
				</div>
				<div className='mb-3'>
					<a href={ svgURL }>SVG URL</a>
				</div>
				<div className='mb-3'>
					<Field label='Width' type='number' value={ width } onChange={ linkState(this, 'width') } />
					<Field label='Height' type='number' value={ height } onChange={ linkState(this, 'height') } />
					<Choice label='Shape' value={ shape } onChange={ linkState(this, 'shape') }>
						<option value='circle'>Circle</option>
						<option value='rect'>Rectangle</option>
					</Choice>
					<FormGroup label='Fill'>
						<Choice label='Type' value={ fill.type } onChange={ linkState(this, 'fill.type') }>
							<option value='linear-gradient'>Linear Gradient</option>
						</Choice>
						<Field label='Color 1' value={ fill.args[0] } onChange={ linkState(this, 'fill.args.0') }>
							<Button onClick={ this.randomizeColor0 }>Randomize</Button>
						</Field>
						<Field label='Color 2' value={ fill.args[1] } onChange={ linkState(this, 'fill.args.1') }>
							<Button onClick={ this.randomizeColor1 }>Randomize</Button>
						</Field>
					</FormGroup>
				</div>
				<div>
					<Button>New</Button>
				</div>
			</section>
		);
	}
}
