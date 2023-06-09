const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
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

const Content = ({infos}) => {
  const [first, second, third] = infos;
  return (
    <div>
      <Part each={first}/>
      <Part each={second}/>
      <Part each={third}/>
    </div>
  )
}

const Total = ({ total_number}) => {
  return (
    <div>
      <p>In total, we have {total_number} exercises!</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content infos={course.parts}/>
      <Total total_number={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App;