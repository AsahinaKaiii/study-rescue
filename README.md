# Study Rescue

Study Rescue is an AI-powered academic planning application designed to help students decide what to work on first, build realistic study schedules, and recover when they fall behind.

## 1. The Problem

Students often have several assignments competing for their attention.

Each assignment may have a different:

- Deadline
- Weight
- Difficulty
- Estimated workload
- Level of completion

A normal to-do list tells students what needs to be completed, but it does not necessarily tell them what they should work on first.

Study plans can also quickly become unrealistic when a student misses a planned study session because of work, illness, family responsibilities, or another unexpected event.

## 2. The Solution

Study Rescue helps students turn their assignment workload into a realistic study plan.

The application considers:

- Assignment deadlines
- Assignment weight
- Difficulty
- Estimated hours
- Current progress
- Available study hours

Study Rescue first calculates assignment priorities using its own deterministic priority algorithm.

The structured assignment information is then used to generate an AI-powered study rescue plan.

If the student later falls behind, the plan can be rebuilt based on their new situation.

## 3. Key Features

### User Authentication

Students can create an account and securely sign in to their own Study Rescue dashboard.

### Assignment Management

Students can add assignments containing:

- Module name
- Assignment title
- Deadline
- Assignment weight
- Estimated hours
- Difficulty

### Progress Tracking

Students can update their assignment progress from 0% to 100%.

The remaining workload can then be recalculated when a new rescue plan is generated.

### Study Availability

Students can enter how many hours they realistically have available to study each day of the week.

### Priority Ranking

Assignments are automatically ranked according to urgency and importance.

Priority levels include:

- Critical
- High
- Medium
- Low

### AI Rescue Plan

Study Rescue can generate a realistic study schedule using assignment information, remaining workload, deadlines, priority scores, and available study hours.

### I Fell Behind

Students can tell Study Rescue when their original study plan no longer worked.

They enter:

- How many study hours they missed
- Why they missed the study time

Study Rescue then rebuilds the plan around the remaining deadlines and available time.

### Fallback Scheduling

Study Rescue also contains a local fallback scheduling system.

If the AI service is unavailable, the application can still create a basic schedule using assignment priorities, remaining workload, deadlines, and student availability.

## 4. How It Works

The Study Rescue workflow is:

1. The student signs in.
2. The student adds assignments.
3. Study Rescue calculates priority scores.
4. The student enters their study availability.
5. Remaining assignment workload is calculated.
6. Assignment and availability data is sent securely to the scheduling engine.
7. Gemini generates a structured rescue plan.
8. The plan is displayed on the student's dashboard.
9. If the student falls behind, Study Rescue can rebuild the plan.
10. If AI generation fails, a local fallback planner can still create a schedule.

## 5. Priority Algorithm

Study Rescue does not rely entirely on artificial intelligence to determine assignment importance.

The application contains a deterministic priority algorithm.

The score considers four main factors:

### Deadline Urgency

Assignments closer to their deadline receive a higher urgency score.

### Assignment Weight

Assignments worth a larger percentage of a module receive a higher score.

### Difficulty

More difficult assignments receive additional priority.

### Progress

Assignments with less completed work receive additional priority because more work remains.

The final score is used to classify assignments as:

- Critical
- High
- Medium
- Low

This priority score is also supplied to the AI scheduling engine.

## 6. AI Rescue Plan

Study Rescue uses Gemini to create structured academic rescue plans.

The AI receives information including:

- Assignment title
- Deadline
- Estimated workload
- Current progress
- Priority score
- Student study availability

The AI is instructed to:

- Protect the closest deadlines
- Prioritize unfinished high-priority work
- Never schedule work after a deadline
- Stay within the student's available study time
- Avoid zero-minute study sessions
- Break work into manageable study sessions
- Warn the student if completing everything is unrealistic

The response is returned as structured JSON and displayed in the React interface.

## 7. I Fell Behind Recovery Mode

A major feature of Study Rescue is its ability to adapt when a study plan no longer works.

Students can select **I Fell Behind** and enter:

- Missed study hours
- The reason they fell behind

Examples include:

- Work commitments
- Illness
- Family responsibilities
- Unexpected events
- Underestimating the workload

Study Rescue then switches to recovery mode.

The scheduling engine protects urgent deadlines, reorganises remaining work, and creates a new plan using the student's remaining available time.

This allows Study Rescue to behave as an adaptive planner rather than a static task list.

## 8. Fallback Scheduling

AI services can sometimes become unavailable.

Study Rescue therefore includes a local JavaScript fallback planner.

The fallback system:

- Finds unfinished assignments
- Calculates remaining workload
- Sorts assignments by priority
- Checks deadlines
- Checks available study hours
- Allocates study sessions before deadlines
- Warns the student when available time is insufficient

This allows core scheduling functionality to continue even if the AI service fails.

## 9. Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend and Database

- Supabase
- PostgreSQL
- Supabase Authentication
- Row Level Security
- Supabase Edge Functions

### Artificial Intelligence

- Google Gemini API

### Deployment

- Vercel

### Version Control

- Git
- GitHub

## 10. Architecture

Study Rescue uses the following architecture:

```text
                    Student
                       |
                       v
                 React + Vite
                       |
           +-----------+-----------+
           |                       |
           v                       v
    Priority Algorithm       Supabase Auth
           |                       |
           v                       v
   Assignment Ranking       PostgreSQL Database
                                   |
                                   v
                            Row Level Security
                                   |
                                   v
                           Supabase Edge Function
                                   |
                                   v
                              Gemini API
                                   |
                                   v
                           Structured AI Plan
                                   |
                      +------------+------------+
                      |                         |
                      v                         v
               Normal Rescue Plan        I Fell Behind
                                         Recovery Mode
