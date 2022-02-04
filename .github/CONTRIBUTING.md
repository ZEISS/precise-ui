# Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Precise UI, which are hosted in the
ZEISS organization on GitHub. These are mostly guidelines, not rules.
Use your best judgment, and feel free to propose changes to this document in a pull request.

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

## Code of Conduct

This project and everyone participating in it is governed by the
[Precise UI Code of Conduct](../CODE_OF_CONDUCT.md). By participating, you are expected to uphold
this code. Please report unacceptable behavior to [team@precise-ui.io](mailto:team@precise-ui.io).

## How Can I Contribute?

### Reporting Bugs

Before creating bug report, please make sure that you first check the
[existing issues](https://github.com/ZEISS/precise-ui/issues?q=is%3Aopen+is%3Aissue+label%3Abug),
as you might find that the issue is already reported. Fill out
[the required template](https://github.com/ZEISS/precise-ui/issues/new?template=bugs.md), the
information it asks for helps us resolve issues faster.

Following these guidelines helps maintainers and the community understand your report :pencil:,
reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Precise UI, including
completely new features and minor improvements to existing functionality.

Before creating enhancement suggestions, please make sure that you first check the
[existing suggestions](https://github.com/ZEISS/precise-ui/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)
, as you might find that the enhancement has already been requested. Fill out
[the template](https://github.com/ZEISS/precise-ui/issues/new?template=features.md),
including the steps that you imagine you would take if the feature you're requesting existed.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/).
After you've determined that the enhancement is not already requested, go ahead and create an issue
providing the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the
  part of Precise UI which the suggestion is related to. You can use
  [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and
  [this tool](https://github.com/colinkeenan/silentcast) or
  [this tool](https://download.gnome.org/sources/byzanz/) on Linux.

## Branching Model

### Main Branches

The central repository holds one branch with an infinite lifetime:

- **main**

We consider origin/main to be the primary branch where the source code of HEAD always reflects a
to-be production-ready state, which is delivered for the next release.

When the source code in the main branch reaches a stable point and is ready to be released, a GitHub
release should be issued, which creates a tag referencing the point in the commit history.

### Supporting Branches

Next to the main branch our development model uses a few of supporting branches to aid parallel
development between team members, ease tracking of features and to assist in quickly fixing live
production problems. Unlike the main branches, these branches always have a limited life time,
since they will be removed eventually.

The two main different types of branches we may use are:

- **Feature branches**
- **Hotfix branches**

#### Creating a Feature Branch

- branch **from** -> `main` -> must merge back **into** -> `main`

Naming convention:

- anything except `main`, `release*`, or `hotfix*`
- preferred `feature/{issueId}-descriptive_feature_title`

#### Creating a hotfix branch

- branch **from** -> `main` -> must merge back **into** -> `main`

Naming convention:

- `hotfix/{issueId}-descriptive_issue_title` or `hotfix/{new_patch_version}`

Hotfix branches are created from the main branch. For example, say version 1.2 is the current
production release running live and causing troubles due to a severe bug. But changes on main
are yet unstable. We may then branch off a hotfix branch and start fixing the problem:

```sh
git checkout -b hotfix/1.2.1 main
npm version patch -m "Upgrade to %s for reasons"
git commit -a -m "Bumped version number to 1.2.1"
```

Don't forget to bump the version number after branching off!
Then, fix the bug and commit the fix in one or more separate commits.

```sh
git commit -m "Fixed severe production problem"
```

## Pull Request Process

Following is a short guide on how to make a valid Pull Request.

1. Firstly you need a local fork of the the project, so go ahead and press the `fork` button in
   GitHub. This will create a copy of the repository in your own GitHub account and you'll see a
   note that it's been forked underneath the project name: `Forked from ZEISS/precise-ui`.
   Clone the newly forked repository locally and set up a new remote that points to the original
   project so that you can grab any changes and bring them into your local copy.

   ```sh
   git remote add upstream git@github.com:ZEISS/precise-ui.git
   ```

   You now have two remotes for this project on disk:

   1. `origin` which points to your GitHub fork of the project.
      You can read and write to this remote.
   2. `upstream` which points to the main project's GitHub repository.
      You can only read from this remote.

2. Create the branch, following or [Branching Model](#branching-model).

3. Do some work :) This is the fun part where you get to contribute to Precise UI.

4. Before pushing your code, few more task that need to be preformed:

   - Make sure that the test and build scripts run successfully
     ```sh
     npm test
     npm run build
     ```
   - Update the CHANGELOG.md following our convention.
   - Increase the version in all relevant files like: `package.json` and `CHANGELOG.md`. The
     versioning scheme we use is [SemVer](http://semver.org/).

5. Commit and push the code to the origin.

   ```sh
   git commit -m "Description of my awesome new feature"
   git push origin HEAD
   ```

6. After the code is successfully pushed to the origin repository, navigate to
   [Precise UI GitHub repository](https://github.com/ZEISS/precise-ui/pulls) and issue a New pull
   request.

You may merge the Pull Request in once you have the sign-off of two other developers, or if you
do not have permission to do that, you may request the second reviewer to merge it for you.
