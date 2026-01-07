# Lab 5: Agentic Coding - Autonomous Feature Development

I have utilized the **GitHub Copilot Coding Agent** to autonomously develop two new features for "The Daily Harvest" e-commerce application. This involved assigning issues directly from the terminal and reviewing/merging the resulting Pull Requests.

## 🤖 Features Implemented by Coding Agent

### 1. Contact Us Page
The Coding Agent created a professional Contact Us page with form validation and integrated it into the application's routing.

**Verification Results:**
- ✅ Form renders correctly with name, email, and message fields.
- ✅ Validation prevents submission of empty fields or invalid emails.
- ✅ Succesful submission displays a confirmation message.

````carousel
![Verifying Contact Us Page](file:///Users/aaliyah/githubcopilot-workshop/walkthroughs/verify_contact_us_pr_5_retry_1767757718890.webp)
<!-- slide -->
![Merging Contact Us PR](file:///Users/aaliyah/githubcopilot-workshop/walkthroughs/merge_pr_5_on_github_1767757843297.webp)
````

### 2. Search Products Functionality
The Coding Agent implemented a real-time search bar on the Products page that filters items by name as the user types.

**Verification Results:**
- ✅ Search bar is visible at the top of the Products page.
- ✅ Real-time filtering works (e.g., searching "apple" only shows Apple products).
- ✅ "No products found" message appears for non-matching queries.
- ✅ Clearing the search bar restores all products.

````carousel
![Verifying Search Bar](file:///Users/aaliyah/githubcopilot-workshop/walkthroughs/verify_search_bar_pr_8_1767758034812.webp)
<!-- slide -->
![Merging Search Bar PR](file:///Users/aaliyah/githubcopilot-workshop/walkthroughs/merge_pr_8_on_github_final_1767758127331.webp)
````

## 🎯 Summary of Agentic Workflow
1. **Issue Creation**: Issues were created via `gh issue create`.
2. **Assignment**: The Coding Agent was assigned using `gh issue edit --assignee @github-copilot`.
3. **Autonomous Work**: The Agent analyzed the codebase, implemented the changes, and created Pull Requests.
4. **Human Review**: I verified the changes both through automated tests and manual UI interaction before merging into `main`.

---

The application now features autonomous enhancements and maintains a high level of code coverage (91.5%).
