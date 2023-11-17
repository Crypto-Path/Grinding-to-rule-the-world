class SkillTreeEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dots: [],
            gridSize: 50,
            isDragging: false,
            dragStart: { x: 0, y: 0 },
            panOffset: { x: 0, y: 0 },
        };
    }

    handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        const { panOffset } = this.state;

        this.setState({
            isDragging: true,
            dragStart: {
                x: clientX - panOffset.x,
                y: clientY - panOffset.y,
            },
        });

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    };

    handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { isDragging, dragStart } = this.state;

        if (isDragging) {
            this.setState({
                panOffset: {
                    x: clientX - dragStart.x,
                    y: clientY - dragStart.y,
                },
            });
        }
    };

    handleMouseUp = () => {
        this.setState({
            isDragging: false,
        });

        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    };

    handleGridClick = (e) => {
        const { gridSize, panOffset } = this.state;
        const { clientX, clientY } = e;

        const x = Math.round((clientX - panOffset.x) / gridSize) * gridSize;
        const y = Math.round((clientY - panOffset.y) / gridSize) * gridSize;

        this.setState((prevState) => ({
            dots: [...prevState.dots, { x, y }],
        }));
    };

    render() {
        const { dots, gridSize, panOffset } = this.state;

        return ( <
            div className = "skill-tree-editor"
            onMouseDown = { this.handleMouseDown }
            onClick = { this.handleGridClick } >
            {
                dots.map((dot, index) => ( <
                    div key = { index }
                    className = "dot"
                    style = {
                        {
                            left: dot.x + panOffset.x,
                            top: dot.y + panOffset.y,
                        }
                    }
                    />
                ))
            } <
            /div>
        );
    }
}

ReactDOM.render( < SkillTreeEditor / > , document.getElementById('app'));