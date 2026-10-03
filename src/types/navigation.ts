// Handed to the detail page through <Link state={...}> so Previous/Next
// cycle through the list the user came from, and Back returns to it.
export interface DetailNavState {
  ids: string[]
  from: string
}
