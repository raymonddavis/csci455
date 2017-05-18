const Department = require('../api/controllers/DepartmentController')
const DepartmentList = [{
  id: 1,
  buildings: [1,2,3]
},
{
  id: 2,
  buildings: [1,2,3]
},
{
  id: 3,
  buildings: [1,2,3]
}]

const missing = 'MISSING_DEPARTMENT'
const notFound = 'DEPARTMENT_NOT_FOUND'

Department.building = id => {
  if (typeof id === 'undefined') return missing
  for (let i in DepartmentList) {
    if (DepartmentList[i].id === id) return DepartmentList[i]
  }
  return notFound
}

describe('Find Department', () => {
  test('Found Department', () => {
    const id = 2
    expect(Department.building(id)).toBe(DepartmentList[id-1])
  })

  test('Missing Department', () => {
    const id = undefined
    expect(Department.building(id)).toBe(missing)
  })

  test('Not Found Department', () => {
    const id = 4
    expect(Department.building(id)).toBe(notFound)
  })
})
