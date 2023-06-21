const Course = ({courses}) => {
    return (
    <div>
        <h1>Web development curriculum</h1>
        {
        courses.map(c => 
            <div key={'course_' + c.id}>
            <Header course={c.name}/>
            <Content infos={c.parts}/>
            </div>
        )
        }
    </div>
    )
}

const Header = ({ course }) => {
    return (
        <div>
            <h2>{course}</h2>
        </div>
    )
}

const Content = ({infos}) => {
    const numberOfExercises = infos.reduce((accumulator, element) => accumulator + element.exercises, 0);

    return (
        <div>
            {
                infos.map(p => 
                    <Part key={'part_' + p.id} each={p}/>
                )
            }
            <p>total of {numberOfExercises} exercises</p>
        </div>
    )
}

const Part = ({ each }) => {
    return (
        <div>
            <p>{each.name}, with {each.exercises} exercises</p>
        </div>
    )
}

export default Course;