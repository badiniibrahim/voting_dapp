export interface PollParams {
  image: string
  title: string
  description: string
  startsAt: number | string
  endsAt: number | string
}

export interface PollS {
  id: number
  image: string
  title: string
  description: string
  votes: number
  contestants: number
  deleted: boolean
  director: string
  startsAt: number
  endsAt: number
  timestamp: number
  avatars: string[]
  voters: string[]
}

export interface Contestant {
  id: number
  image: string
  name: string
  voter: string
  votes: number
  voters: string[]
}
