import { Benefit } from '.'

let benefit

beforeEach(async () => {
  benefit = await Benefit.create({ description: 'test', title: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = benefit.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(benefit.id)
    expect(view.description).toBe(benefit.description)
    expect(view.title).toBe(benefit.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = benefit.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(benefit.id)
    expect(view.description).toBe(benefit.description)
    expect(view.title).toBe(benefit.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
